import { FC } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";

import { ThemeSwitchInput } from "./ThemeSwitch.styles.tsx";
import { useActions } from "../../hooks/useActions.tsx";
import { useTypedSelector } from "../../hooks/useTypedSelector.tsx";

const ThemeSwitch: FC = () => {
  const theme = useTypedSelector((state) => state.theme.theme);
  const { switchTheme } = useActions();

  function onSwitch() {
    switchTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <FormGroup sx={{ alignSelf: "center" }}>
      <FormControlLabel
        control={
          <ThemeSwitchInput onChange={onSwitch} checked={theme === "dark"} />
        }
        label=""
      />
    </FormGroup>
  );
};

export default ThemeSwitch;
