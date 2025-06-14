type CharCodeMap = Map<string, number>;

export const getCharCodes = (): CharCodeMap => {
    const charMap = new Map<string, number>();
    charMap.set("{8001}", 0x8001);
    charMap.set("{0000}", 0x0000);
    charMap.set("{0001}", 0x0001);
    charMap.set("{0002}", 0x0002);
    charMap.set("{0003}", 0x0003);
    charMap.set("{0004}", 0x0004);
    charMap.set("{0005}", 0x0005);
    charMap.set("{0006}", 0x0006);
    charMap.set("{0007}", 0x0007);
    charMap.set("{0008}", 0x0008);
    charMap.set("{0009}", 0x0009);
    charMap.set("{000A}", 0x000A);
    charMap.set("{000B}", 0x000B);
    charMap.set("{000C}", 0x000C);
    charMap.set("{000D}", 0x000D);
    charMap.set("+", 0x000E);
    charMap.set("-", 0x000F);
    charMap.set("{0010}", 0x0010);
    charMap.set("...", 0x0011);
    charMap.set(",,", 0x0012);
    charMap.set("??", 0x0014);
    charMap.set("!!", 0x0015);
    charMap.set("(", 0x001A);
    charMap.set(")", 0x001B);
    charMap.set("{001C}", 0x001C);
    charMap.set("~", 0x001D);
    charMap.set("{001F}", 0x001F);
    charMap.set("=", 0x0020);
    charMap.set(".", 0x0021);
    charMap.set("?", 0x0022);
    charMap.set("!", 0x0023);
    charMap.set("$", 0x0024);
    charMap.set("%", 0x0025);
    charMap.set("&", 0x0026);
    charMap.set("'", 0x0027);
    charMap.set("[", 0x0028);
    charMap.set("]", 0x0029);
    charMap.set("{", 0x002A);
    charMap.set("}", 0x002B);
    charMap.set("_", 0x002C);
    charMap.set("/", 0x002D);
    charMap.set("^", 0x002E);
    charMap.set("|", 0x002F);
    charMap.set("@", 0x0030);
    charMap.set(":", 0x0031);
    charMap.set("{0032}", 0x0032);
    charMap.set("{0033}", 0x0033);
    charMap.set(";", 0x0034);
    charMap.set(" ", 0x0035);
    charMap.set("0", 0x0036);
    charMap.set("1", 0x0037);
    charMap.set("2", 0x0038);
    charMap.set("3", 0x0039);
    charMap.set("4", 0x003A);
    charMap.set("5", 0x003B);
    charMap.set("6", 0x003C);
    charMap.set("7", 0x003D);
    charMap.set("8", 0x003E);
    charMap.set("9", 0x003F);
    charMap.set("A", 0x0040);
    charMap.set("B", 0x0041);
    charMap.set("C", 0x0042);
    charMap.set("D", 0x0043);
    charMap.set("E", 0x0044);
    charMap.set("F", 0x0045);
    charMap.set("G", 0x0046);
    charMap.set("H", 0x0047);
    charMap.set("I", 0x0048);
    charMap.set("J", 0x0049);
    charMap.set("K", 0x004A);
    charMap.set("L", 0x004B);
    charMap.set("M", 0x004C);
    charMap.set("N", 0x004D);
    charMap.set("O", 0x004E);
    charMap.set("P", 0x004F);
    charMap.set("Q", 0x0050);
    charMap.set("R", 0x0051);
    charMap.set("S", 0x0052);
    charMap.set("T", 0x0053);
    charMap.set("U", 0x0054);
    charMap.set("V", 0x0055);
    charMap.set("W", 0x0056);
    charMap.set("X", 0x0057);
    charMap.set("Y", 0x0058);
    charMap.set("Z", 0x0059);
    charMap.set("a", 0x005A);
    charMap.set("b", 0x005B);
    charMap.set("c", 0x005C);
    charMap.set("d", 0x005D);
    charMap.set("e", 0x005E);
    charMap.set("f", 0x005F);
    charMap.set("g", 0x0060);
    charMap.set("h", 0x0061);
    charMap.set("i", 0x0062);
    charMap.set("j", 0x0063);
    charMap.set("k", 0x0064);
    charMap.set("l", 0x0065);
    charMap.set("m", 0x0066);
    charMap.set("n", 0x0067);
    charMap.set("o", 0x0068);
    charMap.set("p", 0x0069);
    charMap.set("q", 0x006A);
    charMap.set("r", 0x006B);
    charMap.set("s", 0x006C);
    charMap.set("t", 0x006D);
    charMap.set("u", 0x006E);
    charMap.set("v", 0x006F);
    charMap.set("w", 0x0070);
    charMap.set("x", 0x0071);
    charMap.set("y", 0x0072);
    charMap.set("z", 0x0073);
    charMap.set("{007D}", 0x007D);
    charMap.set(",", 0x007E);
    charMap.set("*", 0x007F);
    charMap.set("É", 0x0087);
    charMap.set("À", 0x0088);
    charMap.set("Â", 0x008B);
    charMap.set("Ô", 0x008E);
    charMap.set("Ç", 0x0093);
    charMap.set("é", 0x0095);
    charMap.set("à", 0x0096);
    charMap.set("â", 0x0099);
    charMap.set("ê", 0x009A);
    charMap.set("ô", 0x009C);
    charMap.set("ç", 0x00A1);
    charMap.set("{00A4}", 0x00A4);
    charMap.set("Ö", 0x00A5);
    charMap.set("ä", 0x00A6);
    charMap.set("ö", 0x00A7);
    charMap.set("Á", 0x00AC);
    charMap.set("Ã", 0x00AD);
    charMap.set("Í", 0x00B1);
    charMap.set("Ó", 0x00B4);
    charMap.set("Õ", 0x00B5);
    charMap.set("Ú", 0x00B6);
    charMap.set("ñ", 0x00B7);
    charMap.set("á", 0x00B8);
    charMap.set("ã", 0x00B9);
    charMap.set("í", 0x00BD);
    charMap.set("ó", 0x00C0);
    charMap.set("õ", 0x00C1);
    charMap.set("ú", 0x00C2);
    charMap.set("ª", 0x00C5);
    charMap.set("©", 0x0080);
    charMap.set("®", 0x0081);
    return charMap;
};

export const getReversedCharCodes = (map: CharCodeMap): Map<number, string> => {
    return new Map(Array.from(map, a => [a[1], a[0]]));
}

