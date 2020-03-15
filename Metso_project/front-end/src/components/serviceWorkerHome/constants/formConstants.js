const negative_error_message = `Cannot be 0 or negative!`;
const representative_name_error_message = `No special characters`;
const contact_info_error_message = `Invalid Email format`;
const date_error_message = `Future Dates Not accepted`;

export const reportIDMax = 1000;

export const reportConstants = [
  {
    inputLabel: `Job Number`,
    inputType: `number`,
    inputName: `job_number`,
    inputPlaceholder: `Job #`,
    errorMessage: negative_error_message
  },
  {
    inputLabel: `Work order Number.`,
    inputType: `number`,
    inputName: `work_order_number`,
    inputPlaceholder: `Work order #`,
    errorMessage: negative_error_message
  },
  {
    inputLabel: `Project Number.`,
    inputType: `number`,
    inputName: `project_number`,
    inputPlaceholder: `Project #`,
    errorMessage: negative_error_message
  },
  {
    inputLabel: `Representative name`,
    inputType: `text`,
    inputName: `representative_name`,
    inputPlaceholder: `Field service representative name`,
    errorMessage: representative_name_error_message
  },
  {
    inputLabel: `Contact Info Email or Phone`,
    inputType: `text`,
    inputName: `contact_info`,
    errorMessage: contact_info_error_message
  },
  {
    inputLabel: `Date`,
    inputType: `date`,
    inputName: `date`,
    inputPlaceholder: `yyyy-mm-dd`,
    errorMessage: date_error_message
   }

];

export const visit_reason_constants = 
  {
    inputLabel: `Reason for Visit`,
    inputType: `textarea`,
    inputName: `visit_reason`,
    inputPlaceholder: `Reason for Visit`,
    errorMessage: `Cannot be blank `
  };

export const work_performed_constants = 
  {
    inputLabel: `Work Performed`,
    inputType: `textarea`,
    inputName: `work_performed`,
    inputPlaceholder: `Enter your Work Performed`,
    errorMessage: `Cannot be blank `
  };

export const recommendation_constants = 
  {
    inputLabel: `Recommendation`,
    inputType: `textarea`,
    inputName: `recommendation`,
    inputPlaceholder: `Suggest some recommendations`,
    errorMessage: `Cannot be blank `
  };
