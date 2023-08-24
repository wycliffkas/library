import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { StyledInputBase, SearchIconWrapper, Search } from "./styles";

interface SearchInputProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search..."
				inputProps={{ "aria-label": "search" }}
				value={value}
				onChange={onChange}
				autoFocus
			/>
		</Search>
	);
};

export default SearchInput;
