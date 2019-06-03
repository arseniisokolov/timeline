import { parseNumber } from "./helpers";

/** Модель суммы */
export class AmountModel {

    /** Модель проинициализирована с пустыми данными */
    public get IsEmpty(): boolean {
        return this._isEmpty;
    };

    /** Форматированная сумма со знаком и валютой */
    public Formatted: string;
    public Numeric: number;
    public Currency: string;

    private _isEmpty: boolean;
    private readonly _separator: string = " ";
    private readonly _decimalSeparator: string = ",";

    constructor(amount: number, currency: string, isDebet: boolean) {
        amount =  parseNumber(amount);
        if (amount === undefined) {
            this._isEmpty = true;
            return;
        }
        this.Numeric = isDebet ? (-1 * amount) : amount;
        this.Currency = currency;
        this.Formatted = `${this.getFormattedAmount(Math.abs(amount), isDebet)} ${this.getCurrencySign(currency)}`;
    }

    private getFormattedAmount(amount: number, isDebet: boolean): string {
        const amountParts = (Math.round(amount * 100) / 100).toFixed(2).split(".")
        const bodyPart = parseInt(amountParts[0] || "0");
        let decimalPart = amountParts[1] || "00";
        decimalPart.length === 1 ? decimalPart += "0" : decimalPart += "";
        let result = this.getSeparated(bodyPart);
        if (amount > 0) {
            result = `${isDebet ? '-' : '+'}${result}`;
        }
        return result.concat(`${this._decimalSeparator}${decimalPart}`);
    }

    private getCurrencySign(currency: string): string {
        switch (currency) {
            case "RUR":
            case "RUB": return "₽";
            case "USD": return "$";
            case "EUR": return "€";
            default: return "ед.";
        }
    }

    private getSeparated(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this._separator);
    }

}