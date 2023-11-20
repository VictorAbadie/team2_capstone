const Logout = () => {
  sessionStorage.removeItem("token");
  // window.sessionStorage.clear();
  // reminder for myself
  console.log("Logged Out")
};

export default Logout;