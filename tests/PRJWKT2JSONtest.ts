import "jasmine";
import { SRTextParser } from '../src/index';

describe('parse prj file data', function () {
    const data = 'PROJCS["NAD_1983_StatePlane_California_V_FIPS_0405_Feet",GEOGCS["GCS_North_American_1983",DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Lambert_Conformal_Conic"],PARAMETER["False_Easting",6561666.666666666],PARAMETER["False_Northing",1640416.666666667],PARAMETER["Central_Meridian",-118],PARAMETER["Standard_Parallel_1",34.03333333333333],PARAMETER["Standard_Parallel_2",35.46666666666667],PARAMETER["Latitude_Of_Origin",33.5],UNIT["Foot_US",0.30480060960121924]]';
    it('should instantiate', () => {
        const parser = new SRTextParser();
        expect(parser).not.toBeNull();
        expect(parser).not.toBeUndefined();
    });
    it('should parse without errors', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        
    });
    it('should return an object from Parse', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        expect(typeof result).toBe('object');

    });

    it('should only have one key at the top level', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        
        const keys = Object.keys(result);
        expect(keys.length).toBe(1);
    });
    it('should have the correct content', () => {
        const parser = new SRTextParser();
        const result = parser.Parse(data);
        const keys = Object.keys(result);
        const firstKey = keys[0];
        expect(firstKey).toEqual('PROJCS');
        expect(result.PROJCS.label).toBeTruthy();
        expect(result.PROJCS.label).toEqual('NAD 1983 StatePlane California V FIPS 0405 Feet');
        expect(result.PROJCS.GEOGCS).toBeTruthy();
        expect(result.PROJCS.GEOGCS.label).toEqual('GCS North American 1983');
        expect(result.PROJCS.GEOGCS.DATUM).toBeTruthy();
        expect(result.PROJCS.GEOGCS.DATUM.label).toEqual('D North American 1983');
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID).toBeTruthy();
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.label).toEqual('GRS 1980');
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values).toBeTruthy();
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values.length).toEqual(2);
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values[0]).toEqual('6378137');
        expect(result.PROJCS.GEOGCS.DATUM.SPHEROID.values[1]).toEqual('298.257222101');
        expect(result.PROJCS.PRIMEM).toBeTruthy();
        expect(result.PROJCS.PRIMEM.label).toEqual('Greenwich');
        expect(result.PROJCS.PRIMEM.values.length).toEqual(1);
        expect(result.PROJCS.PRIMEM.values[0]).toEqual('0');
        expect(Array.isArray(result.PROJCS.UNIT)).toBeTrue();
        expect(result.PROJCS.UNIT[0].label).toEqual('Degree');
        expect(result.PROJCS.UNIT[0].values.length).toEqual(1);
        expect(result.PROJCS.UNIT[0].values[0]).toEqual('0.017453292519943295');
        expect(result.PROJCS.UNIT[1].label).toEqual('Foot US');
        expect(result.PROJCS.UNIT[1].values.length).toEqual(1);
        expect(result.PROJCS.UNIT[1].values[0]).toEqual('0.30480060960121924');
        expect(result.PROJCS.PROJECTION).toBeTruthy();
        expect(result.PROJCS.PROJECTION.label).toEqual('Lambert Conformal Conic');
        expect(Array.isArray(result.PROJCS.PARAMETER)).toBeTrue();
        expect(result.PROJCS.PARAMETER[0].label).toEqual('False Easting');
        expect(result.PROJCS.PARAMETER[0].values.length).toEqual(1);
        expect(result.PROJCS.PARAMETER[0].values[0]).toEqual('6561666.666666666');    
        

        
        //expect(result.PROJCS.GEOCS.DATUM.PRIMEM.values.length).toEqual('Greenwich');
        
    });
});
