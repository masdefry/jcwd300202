import prisma from '@/prisma'
import { deleteFiles } from '@/utils/deleteFiles'
import { IPropertyType } from './types'
import { ITenant } from '../tenant.service/types'
import { IProperty } from '../property.service/types'

export const getPropertyTypesService = async({ name }: Pick<IPropertyType, 'name'>) => {
        const propertyType = await prisma.propertyType.findMany({
            where: {
                name: {
                    contains: name as string || '',
                    mode: 'insensitive'
                }
            },
            orderBy: {
                name: 'asc'
            },
        })

        return { propertyType }
}

export const createPropertyTypeService = async({ id, role, name, description }: Pick<ITenant, 'id' | 'role'> & Pick<IPropertyType, 'name' | 'description'>) => {

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id,
                deletedAt: null
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(!isTenantExist.isVerified)  throw { msg: 'Tenant not verified!', status: 406 }
        if(isTenantExist.role !== role )  throw { msg: 'Role unauthorized!', status: 403 }
        
        const isPropertyTypeExist = await prisma.propertyType.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        })

        if(isPropertyTypeExist?.id) throw { msg: 'Property type already exist!', status: 406 }
        
        const createdPropertyType = await prisma.propertyType.create({
            data: {
                name,
                isCustom: true,
                tenantId: isTenantExist?.id,
                description
            }
        })

        return { createdPropertyType }
}

export const deletePropertyTypeService = async({ id, role, propertyTypeId }: Pick<ITenant, 'id' | 'role'> & Pick<IProperty, 'propertyTypeId'>) => {
        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id,
                deletedAt: null
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(!isTenantExist.isVerified)  throw { msg: 'Tenant not verified!', status: 406 }
        if(isTenantExist.role !== role )  throw { msg: 'Role unauthorized!', status: 403 }
        
        const isPropertyTypeExist = await prisma.propertyType.findFirst({
            where: {
                id: Number(propertyTypeId)
            }
        })

        if(isPropertyTypeExist?.id) throw { msg: 'Property type already exist!', status: 406 }
        if(isPropertyTypeExist?.tenantId !== isTenantExist?.id) throw { msg: 'Actions not permitted!', status: 403 } 

        const propertiesByPropertyType = await prisma.property.findMany({
            where: {
              propertyTypeId: isPropertyTypeExist?.id,
              deletedAt: null,
            },
            include: {
              propertyDetail: true,
              propertyRoomType: true,
            },
          })

          if(propertiesByPropertyType.length > 0) {
              const getPropertyImages = await prisma.propertyImage.findMany({
                where: {
                  propertyDetailId: {
                    in: propertiesByPropertyType?.map(item => item?.propertyDetail?.id as number)
                },
                },
              })
            
              const propertyImagesToDelete = getPropertyImages.map((item) => {
                return {
                  destination: item?.directory,
                  filename: `${item?.filename}.${item?.fileExtension}`,
                }
              })
            
              const getPropertyRoomImages = await prisma.propertyRoomImage.findMany({
                where: {
                  propertyRoomTypeId: {
                    in: propertiesByPropertyType?.map(item => item?.propertyRoomType?.map((itm) => itm?.id)).flat(),
                  },
                },
              })
            
              const propertyRoomImagesToDelete = getPropertyRoomImages.map((item) => {
                return {
                  destination: item?.directory,
                  filename: `${item?.filename}.${item?.fileExtension}`,
                }
              })
            
              await prisma.$transaction(
                async (tx) => {
                  try {
                    const deletedPropertyHasFacilities =
                      await tx.propertyHasFacility.deleteMany({
                        where: {
                          propertyId: {
                            in: propertiesByPropertyType?.map(item => item?.id)
                        },
                        },
                      })
            
                    const deletedRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
                      where: {
                        propertyRoomTypeId: {
                          in: propertiesByPropertyType?.map(item => item?.propertyRoomType?.map((itm) => itm?.id)).flat(),
                        },
                      },
                    })
            
                    const deletedSeason = await tx.season.deleteMany({
                      where: {
                        propertyId: {
                            in: propertiesByPropertyType?.map(item => item?.id)
                        },
                      }
                    })
            
                    const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
                      where: {
                        propertyId: {
                            in: propertiesByPropertyType?.map(item => item?.id)
                        },
                      },
                    })
            
                    const deletedPropertyImages = await tx.propertyImage.deleteMany({
                      where: {
                        propertyDetailId: {
                            in: propertiesByPropertyType?.map(item => item?.propertyDetail?.id as number)
                        },
                      },
                    })
            
                    const deletedPropertyRoomImages = await tx.propertyRoomImage.deleteMany(
                      {
                        where: {
                          propertyRoomTypeId: {
                            in: propertiesByPropertyType?.map(item => item?.propertyRoomType?.map((itm) => itm?.id)).flat(),
                          },
                        },
                      },
                    )
            
                    const deletedPropertyDetail = await tx.propertyDetail.deleteMany({
                      where: {
                        propertyId: {
                            in: propertiesByPropertyType?.map(item => item?.id)
                        },
                      },
                    })
            
                    const softDeletePropertyRoomType = await tx.propertyRoomType.updateMany(
                      {
                        where: {
                            propertyId: {
                                in: propertiesByPropertyType?.map(item => item?.id)
                            },
                        },
                        data: {
                          deletedAt: new Date().toISOString(),
                        },
                      },
                    )
            
                    const softDeleteProperty = await tx.property.updateMany({
                      where: {
                        id: {
                            in: propertiesByPropertyType?.map(item => item?.id)
                        },
                      },
                      data: {
                        deletedAt: new Date().toISOString(),
                      },
                    })
            
                    deleteFiles({
                      imagesUploaded: {
                        images: [...propertyImagesToDelete, ...propertyRoomImagesToDelete],
                      },
                    })
                  } catch (err) {
                    throw { msg: 'Delete property type failed!', status: 500 }
                  }
                },
                {
                  timeout: 50000,
                },
              )
          }
        
}