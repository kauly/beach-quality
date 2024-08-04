import { point } from "@turf/helpers";

import type { ImaItem } from "./app.types";
import { median } from "d3";

const targetProperties: Partial<keyof ImaItem>[] = [
  "MUNICIPIO_COD_IBGE",
  "MUNICIPIO",
  "BALNEARIO",
];

export function imaToGeoJson(data: ImaItem[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: data.map((item) => {
      const properties = Object.keys(item).reduce(
        (acc, curr) => ({
          ...acc,
          ...(targetProperties.includes(curr) ? { [curr]: item[curr] } : {}),
        }),
        {},
      );
      const results =
        item?.ANALISES?.map((item) => parseInt(item.RESULTADO)) ?? [];
      const total = median(results);

      return point([item.LONGITUDE, item.LATITUDE], { ...properties, total });
    }),
  };
}

export function mainHistogramData(data: ImaItem[]): number[] {
  return data.reduce((acc, curr) => {
    if (!curr.ANALISES) return acc;
    return [...acc, ...curr.ANALISES?.map((item) => parseInt(item.RESULTADO))];
  }, [] as number[]);
}
