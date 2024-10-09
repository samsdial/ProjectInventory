type ButtonColor = "bg-red-500" | "bg-green-500" | "bg-blue-500";

export interface IButton {
    text: string;
    color: ButtonColor;
    onClick?: () => void;
}