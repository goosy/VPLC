import { WordTag } from './index.js';
export class UIntTag extends WordTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readUInt16BE(0); // 调用基类确保已加载
    }

    /**
     * 只接受0-65535整数
     * @param {number} value
     */
    set value(value) {
        if (value < 0 || value > 65535) {
            console.log("Invalid value");
            return;
        }
        super.value.writeUInt16BE(value, 0);// 调用基类确保已加载
    }

    constructor({ name = "", type = "UINT" } = { name: "", type: "UINT" }) {
        super({name, type});
    }
}