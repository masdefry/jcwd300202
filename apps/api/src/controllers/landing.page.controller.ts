import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export const getLandingPageData = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body
        let cities, user;
        let propertyByHistoryView: any[] = []
        let propertyByRecentBooks: any[] = []
        let propertyByUserCountry: any[] = []
        if(id) {
            user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if(user!.id) {
                const propertyIdByRecentBooks = await prisma.transaction.findMany({
                    where: {
                        userId: id
                    },
                    include: {
                        property: {
                            include: {
                                city: true,
                                country: true,
                                propertyRoomType: {
                                    orderBy: {
                                        price: 'asc'
                                    }
                                },
                                propertyDetail: {
                                    include: {
                                        propertyImage: true
                                    }
                                },
                                review: true
                            }
                        }
                    }
                })
        
                propertyByRecentBooks = propertyIdByRecentBooks.map(item => {
                    return item.property
                })
        
                const propertyIdByHistoryView = await prisma.historyView.findMany({
                    where: {
                        userId: id
                    },
                    include: {
                        property: {
                            include: {
                                city: true,
                                country: true,
                                propertyRoomType: {
                                    orderBy: {
                                        price: 'asc'
                                    }
                                },
                                propertyDetail: {
                                    include: {
                                        propertyImage: true
                                    }
                                },
                                review: true
                            }
                        }
                    },
                    take: 10
                })
        
                propertyByHistoryView = propertyIdByHistoryView.map(item => {
                    return item.property
                })
                
                if(user?.countryId) {
                    propertyByUserCountry = await prisma.property.findMany({
                        where: {
                            countryId: user?.countryId
                        },
                        take: 10,
                        include: {
                            city: true,
                            country: true,
                            propertyRoomType: {
                                orderBy: {
                                    price: 'asc'
                                }
                            },
                            propertyDetail: {
                                include: {
                                    propertyImage: true
                                }
                            },
                            review: true
                        }
                    })
                }

                
            }
        }

        
        const transactions = await prisma.transaction.groupBy({
            by: 'propertyId',
            _sum: {
                total: true
            },
            orderBy: {
                _sum: {
                    total: 'desc'
                }
            }
        })
        
        // if(transactions.length <= 0) {
        //     const citiesId = await prisma.property.groupBy({
        //         by: ['cityId'],
        //         where: {
        //             id: {
        //                 in: transactions.map(item => item.propertyId)
        //             } 
        //         }
        //     })
    
        //     cities = await prisma.city.findMany({
        //         where: {
        //             id: {
        //                 in: citiesId.map(item => item.cityId)
        //             }
        //         }
        //     })
        // } else {
        // }
        
        const properties = await prisma.property.findMany({
            take: 20,
            include: {
                city: true,
                country: true,
                propertyRoomType: {
                    orderBy: {
                        price: 'asc'
                    }
                },
                propertyDetail: {
                    include: {
                        propertyImage: true
                    }
                },
                review: true
            }
        })

        cities = await prisma.city.findMany({
            take: 5,
            include: {
                country: true
            }
        })

        const propertyTypes = await prisma.propertyType.findMany({
            take: 10
        })

        res.status(200).json({
            error: false,
            message: 'Get landing page data success',
            data: {
                cities,
                properties,
                propertyTypes,
                transactions,
                propertyByHistoryView,
                propertyByRecentBooks,
                propertyByUserCountry,
            }
        })

    } catch (error) {
        next(error)
    }
}