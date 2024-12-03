import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function AppNav() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Supervive Vault Trainer</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            showAnchorIcon
            href="https://github.com/Ishou/supervive-vault-trainer"
            target="_blank"
            variant="flat"
          >
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
