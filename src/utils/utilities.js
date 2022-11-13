export const currencyFormatter = (label, amount) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: label,
	});
	return formatter.format(amount);
};
