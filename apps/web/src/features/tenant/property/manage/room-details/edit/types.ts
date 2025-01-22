export interface IParams {
    slug: string;
    id: string;
  }
  
  export interface IPropertyRoomType {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface IErrorResponse {
    response?: {
      data: {
        message: string;
      };
    };
  }
  
  export interface IUseManageEditRoomHook {
    isSubmitting: boolean;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    dataPropertyRoomType: IPropertyRoomType | null;
    isPendingPropertyRoomType: boolean;
    isError: boolean;
    error: any;
    mutateUpdatePropertyRoomTypeGeneral: (variables: any) => void; 
    isPendingUpdatePropertyRoomTypeGeneral: boolean;
  }
  