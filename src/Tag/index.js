import { S7Tag } from "./S7Tag.js"
import { BoolTag } from "./BoolTag.js"
import { ByteTag } from "./ByteTag.js"
import { USIntTag } from "./USIntTag.js"
import { CharTag } from "./CharTag.js"
import { SIntTag } from "./SIntTag.js"
import { WordTag } from "./WordTag.js"
import { UIntTag } from "./UIntTag.js"
import { DateTag } from "./DateTag.js"
import { S5TimeTag } from "./S5TimeTag.js"
import { IntTag } from "./IntTag.js"
import { DWordTag } from "./DWordTag.js"
import { UDIntTag } from "./UDIntTag.js"
import { TODTag } from "./TODTag.js"
import { DIntTag } from "./DIntTag.js"
import { TimeTag } from "./TimeTag.js"
import { StringTag } from "./StringTag.js"

const S7Tags = {
    "BOOL": BoolTag,
    "BYTE": ByteTag,
    "USINT": USIntTag,
    "CHAR": CharTag,
    "SINT": SIntTag,
    "WORD": WordTag,
    "UINT": UIntTag,
    "DATE": DateTag,
    "S5TIME": S5TimeTag,
    "INT": IntTag,
    "DWORD": DWordTag,
    "UDINT": UDIntTag,
    "TOD": TODTag,
    "DINT": DIntTag,
    "TIME": TimeTag,
    "STRING": StringTag,
};

function createTag(type, argus = {type}) {
    return new S7Tags[type](argus);
}

export {
    S7Tag,
    S7Tags,
    createTag,
    // 基本类型 BOOL BYTE CHAR WORD DWORD INT DINT REAL S5TIME TIME
    BoolTag,
    ByteTag,
    USIntTag,
    CharTag,
    SIntTag,
    WordTag,
    UIntTag,
    DateTag,
    S5TimeTag,
    IntTag,
    DWordTag,
    UDIntTag,
    TODTag,
    DIntTag,
    TimeTag,
    // 复杂类型 DATE_AND_TIME STRING ARRAY STRUCT
    StringTag,
}