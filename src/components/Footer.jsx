const Footer = ({ onSignout}) => (
  <div className="mx-auto">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlin"
      onClick={onSignout}
    >
      Sign out
    </button>
  </div>
)

export default Footer;