import { CheckBox, LinearScale, RadioButtonChecked, ShortText, Subject } from "@material-ui/icons";

const questionTypesExtended = [
	{
		id: 1,
		text: "Short answer",
		icon: <ShortText />,
	},
	{
		id: 2,
		text: "Paragraph",
		icon: <Subject />,
	},
	{
		id: 3,
		text: "Multiple choice",
		icon: <RadioButtonChecked />,
	},
	{
		id: 4,
		text: "Checkboxes",
		icon: <CheckBox />,
	},
	{
		id: 5,
		text: "Linear scale",
		icon: <LinearScale />,
	},
]
Object.freeze(questionTypesExtended);
export default questionTypesExtended;