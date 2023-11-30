import { LightningElement } from 'lwc';
import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class ModalListaDeAeroportos extends LightningElement {
  // formData is utilized for saving current form values
  formData = {};
  failureType = null;
  saveStatus = {};
  saveInProcess = false;

  handleCloseClick() {
    this.close('canceled');
  }

  closeModal() {
    this.close('success');
  }

   async saveData() {
    // switches disabled state on buttons
    this.saveInProcess = true;
    const saveStatus = await sendData(this.formData);
    return (saveStatus && saveStatus.success)
      ? closeModal()
      : mitigateSaveFailure();
  }

  async handleSaveClick() {
    if (isValid(this.formData)) {
      // begin saving data, temporarily disable
      // LightningModal's close button
      // Be sure to reenable the close button, by setting
      // this.disableClose = false, IF further interaction
      // is desired before the modal closes
      this.disableClose = true;
      await saveData();
    } else {
      // function that display form errors based on data
      showFormErrors(this.formData);
    }
  }
}