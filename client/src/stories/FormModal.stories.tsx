// FormModal.stories.tsx
import React from "react";
import { Meta } from "@storybook/react";
import FormModal, { FormModalProps } from "../components/FormModal";
import { Book } from "../constants/types";
import { ComponentStory } from "@storybook/react";

export default {
	title: "Components/FormModal",
	component: FormModal,
	argTypes: {
		open: {
			control: "boolean"
		},
		onClose: {
			action: "close"
		},
		onSubmit: {
			action: "submit"
		},
		isEditing: {
			control: "boolean"
		},
		formData: {
			control: "object"
		}
	}
} as Meta;

const Template: ComponentStory<typeof FormModal> = (args) => (
	<FormModal {...args} />
);

export const AddBook = Template.bind({});
AddBook.args = {
	open: true,
	isEditing: false,
	formData: null
};

export const EditBook = Template.bind({});
EditBook.args = {
	open: true,
	isEditing: true,
	formData: {
		ISBN: "978-0-14-312755-0",
		title: "The Martian",
		author: "Andy Weir"
	} as Book
};
