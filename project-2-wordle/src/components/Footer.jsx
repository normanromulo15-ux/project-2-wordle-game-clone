function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-base mt-6"
    >
      © {currentYear} The Wordle App
    </footer>
  )
}

export default Footer;