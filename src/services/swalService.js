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

const swalService = {
  notExpectedUser,
};

export default swalService;
