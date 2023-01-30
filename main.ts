enum temphum {
    temp,
    hum
}
//% color=#4c6ef5 weight=25 icon="\uf043" block="Sensor SHT3x"
namespace CIPSHT31 {
    let i2cAddress = 0x44;
    let SHT31_MEAS_HIGHREP_STRETCH = 0x2C06;
    let SHT31_MEAS_MEDREP_STRETCH = 0x2C0D;
    let SHT31_MEAS_LOWREP_STRETCH = 0x2C10;
    let SHT31_MEAS_HIGHREP = 0x2400;
    let SHT31_MEAS_MEDREP = 0x240B;
    let SHT31_MEAS_LOWREP = 0x241;
    let SHT31_CLEARSTATUS = 0x3041;
    let SHT31_SOFTRESET = 0x30A2;
    let SHT31_HEATEREN = 0x306D;
    let SHT31_HEATERDIS = 0x3066;
    let SHT31_REG_HEATER_BIT = 0x0d;

    let t = 0;
    let h = 0;
    /**
     * Read Temperature in degrees celcius from the SHT3x sensor.
     * Returns a number describing the ambient temperature in degrees celsius
    */
    //% blockId="CIPSHT31_leer_temperatura"
    //% block="read temperature"
    export function leer_temperatura(): number {
        pins.i2cWriteNumber(i2cAddress, 0xFF, NumberFormat.UInt8LE, false);
        basic.pause(100);
        let buff = pins.i2cReadBuffer(i2cAddress, 3);
        let result = buff[0] << 8;
        result |= buff[1];
        result = (((21965 * result) >> 13) - 46850) / 1000;
        return result;
    }

    /**
   * Read Relative Humidity from the SHT3x Sensor.
   * Returns a number describing the relative humidity in percentage % relative
   * humidity
  */
    //% blockId="CIPSHT31_leer_humedad"
    //% block="read humidity"

    export function leer_humedad(): number {
        pins.i2cWriteNumber(i2cAddress, 0xFF, NumberFormat.UInt8LE, false);
        basic.pause(100);
        let buff = pins.i2cReadBuffer(i2cAddress, 3);
        let result = buff[0] << 8;
        result |= buff[1];
        result = (((15625 * result) >> 13) - 6000) / 1000;
        return result;
    }


}
