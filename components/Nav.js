import Link from "next/link";
import { useUser } from "./User";
import NavStyles from "./styles/NavStyles";
import HorizontalDivider from "./styles/HorizontalDivider";

import Signout from "./Signout";

function Nav() {
  const me = useUser();
  return (
    <NavStyles data-testid="nav">
      {me && (
        <>
          <Link href="/grocery">
            <a>Grocery</a>
          </Link>
          <HorizontalDivider />
          <Link href="/mymeals">
            <a>MyMeals</a>
          </Link>
          <HorizontalDivider />
          <Link href="/account">
            <a>Account</a>
          </Link>
          {/* <Signout /> */}
        </>
      )}
      {!me && (
        <>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
          <HorizontalDivider />
          <Link href="/signin">
            <a>Login</a>
          </Link>
        </>
      )}
    </NavStyles>
  );
}

export default Nav;
