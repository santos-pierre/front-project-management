const checkAuthenticate = () => {
    return localStorage.getItem('sanctum_token') !== null;
};

export default checkAuthenticate;
