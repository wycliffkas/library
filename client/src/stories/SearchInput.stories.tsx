import React from "react";
import SearchInput from "../components/SearchInput";

export default {
	title: "Components/SearchInput",
	component: SearchInput
};

export const Default = () => <SearchInput value="" onChange={() => {}} />;
export const WithValue = () => <SearchInput value="Hello" onChange={() => {}} />;
