export const getDashboardByRole = (role) => {
  switch (role) {
    case "admin":
      return "/dashboard";

    case "guru":
      return "/guru/dashboard";

    case "murid":
      return "/murid/dashboard";

    default:
      return "/unauthorized";
  }
};