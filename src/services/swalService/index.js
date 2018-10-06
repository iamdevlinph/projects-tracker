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

const error = (title, text = null) => {
  swal({
    title,
    text,
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

const swalService = {
  notExpectedUser,
  error,
  success,
};

export default swalService;
