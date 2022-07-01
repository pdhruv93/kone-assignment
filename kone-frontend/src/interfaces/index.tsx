export interface EquipmentInterface {
  equipmentNumber: number;
  address: string;
  contractStartDate: Date;
  contractEndDate: Date;
  status: 'RUNNING' | 'STOPPED';
}

export interface EquipmentResponseInterface extends EquipmentInterface {
  _id: string;
}
