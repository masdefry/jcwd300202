export interface IParams {
    slug: string;
  }
  
  export interface IDataForDelete {
    password: string;
    id: string;
    name: string;
  }
  
  export interface IPropertyRoomType {
    id: string;
    name: string;
  }
  
  export interface IUseManageRoomDetailsHook {
    showDeleteConfirmation: boolean;
    setShowDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    dataForDelete: IDataForDelete;
    setDataForDelete: React.Dispatch<React.SetStateAction<IDataForDelete>>;
    dataPropertyRoomTypes: any;
    isPendingPropertyRoomTypes: boolean;
    isError: boolean;
    error: any; 
    mutateDeletePropertyRoomType: (variables: any) => void; 
    isPendingDeletePropertyRoomType: boolean;
  }