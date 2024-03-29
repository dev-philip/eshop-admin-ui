 const Footer = () => {
    const getTodaysYear = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        return currentYear;
    }
    return (
        <>
            <footer className="footer">
                <div className="container-fluid d-flex justify-content-between">
                    <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © Grow with FAST Project - All Rights Reserved {getTodaysYear()}</span>
                    <span className="float-none float-sm-end mt-1 mt-sm-0 text-end">  Visit My Online Portfolio <a href="https://www.devphilip.com/" target="_blank"> Here</a></span>
                </div>
            </footer>
        </>
    )
}

export default Footer;