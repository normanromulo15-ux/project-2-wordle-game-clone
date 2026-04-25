function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-base mt-4"
    >
      © {currentYear} NDGR
    </footer>
  )
}

export default Footer;