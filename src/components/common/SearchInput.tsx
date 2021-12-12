import { InputAdornment, TextField } from "@mui/material";
import { BiSearch } from "react-icons/bi";

export const SearchInput: React.FC = () => {
  return (
    <TextField
      placeholder="Buscar Ferias, Stands, etc..."
      name="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BiSearch size={20} />
          </InputAdornment>
        ),
      }}
    />
  );
};
