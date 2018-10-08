import swal from 'sweetalert2';

const notExpectedUser = () => {
  swal({
    title: 'You are not Devlin',
    text: 'Other users currently don\'t have any functions right now',
    type: 'info',
    footer: '<a href="https://github.com/iamdevlinph/projects-tracker/issues/13" target="blank">Read more</a>',
    allowOutsideClick: false,
  });
};

const error = (title, html = null) => {
  swal({
    title,
    html,
    type: 'error',
  });
};

const success = (title, text = null) => {
  swal({
    title,
    text,
    type: 'success',
  });
};

const confirm = (title, html = null, confirmButtonText = 'Yes') => swal({
  title,
  html,
  type: 'warning',
  showCancelButton: true,
  confirmButtonText,
});

const swalService = {
  notExpectedUser,
  error,
  success,
  confirm,
};

export default swalService;
