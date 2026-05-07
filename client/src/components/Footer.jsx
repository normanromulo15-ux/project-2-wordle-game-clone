function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-sm md:text-base pb-4         
      lg:text-xl lg:pt-4"
    >
      © {currentYear} The Wordle App
    </footer>
  );
}

export default Footer;
