export interface IDataCreatePropertyRoomFacility {
    name: string;
    file: File[];
  }
  
  export interface IUseManageAddRoomHook {
    isSubmitting: boolean;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    mutateCreateRoom: (variables: any) => void;
    isPendingCreateRoom: boolean;
    dataRoomFacilities: any;
    isPendingRoomFacilities: boolean;
    showCreatePropertyRoomFacilityForm: boolean;
    setShowCreatePropertyRoomFacilityForm: React.Dispatch<React.SetStateAction<boolean>>;
    dataCreatePropertyRoomFacility: IDataCreatePropertyRoomFacility;
    setDataCreatePropertyRoomFacility: React.Dispatch<React.SetStateAction<IDataCreatePropertyRoomFacility>>;
    changedCheckbox: boolean;
    setChangedCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
    uploadFile: boolean;
    setUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
    mutateCreatePropertyRoomFacility: () => void;
    isPendingCreatePropertyRoomFacility: boolean;
  }