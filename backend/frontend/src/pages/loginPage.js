import LoginComponent from '../Components/loginComponent';

const loginPage = () => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove(); // Remove the backdrop
    }
    return (
        <LoginComponent />
    );
}

export default loginPage;