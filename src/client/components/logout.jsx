const Logout = () => {
  sessionStorage.removeItem("token");
  console.log("Logged Out")
};

export default Logout;
