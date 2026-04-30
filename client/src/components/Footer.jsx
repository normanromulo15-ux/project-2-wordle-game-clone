function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-base"
    >
      © {currentYear} The Wordle App by Norman Digma Romulo
    </footer>
  )
}

export default Footer;