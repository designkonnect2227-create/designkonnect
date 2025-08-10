const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 mt-16">
      <div className="container mx-auto py-8 grid gap-4 md:grid-cols-3 items-center">
        <div className="text-sm text-muted-foreground">© {year} DesignKonnect. All rights reserved.</div>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Contact: </span>
          <a href="mailto:designkonnect2227@gmail.com" className="text-foreground underline underline-offset-4">designkonnect2227@gmail.com</a>
        </div>
        <div className="md:text-right text-sm text-muted-foreground">Made with care for architecture.</div>
      </div>
    </footer>
  );
};

export default Footer;
