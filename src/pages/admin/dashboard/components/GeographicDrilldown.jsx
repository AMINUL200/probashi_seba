import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  MapPin,
  Plus,
  Minus,
  Globe2,
  Users,
  Activity,
  Banknote,
  MapPinned,
} from "lucide-react";

/* ------------------------------------------------------------------
   Map settings
   MAP_CENTER is used by BOTH the projection and ZoomableGroup.
------------------------------------------------------------------ */

const geoUrl = "/maps/bangladesh-districts.geojson";

const MAP_WIDTH = 420;
const MAP_HEIGHT = 460;
const MAP_CENTER = [90.35, 23.7]; // [longitude, latitude]
const DEFAULT_POSITION = { coordinates: MAP_CENTER, zoom: 1 };

/* ------------------------------------------------------------------
   Name matching
   GeoJSON files spell districts differently (Chittagong / Chattogram,
   "Dhaka District", ...). Every name is reduced to one canonical key so
   the map polygons can always find their data row.
------------------------------------------------------------------ */

const KEY_ALIASES = {
  chittagong: "chattogram",
  comilla: "cumilla",
  barisal: "barishal",
  bogra: "bogura",
  jessore: "jashore",
  nawabganj: "chapainawabganj",
  chapainababganj: "chapainawabganj",
  coxbazar: "coxsbazar",
  jhalakati: "jhalokati",
  jhalakathi: "jhalokati",
  jhalokathi: "jhalokati",
  maulvibazar: "moulvibazar",
  khagrachari: "khagrachhari",
  netrakona: "netrokona",
  brahamanbaria: "brahmanbaria",
  laxmipur: "lakshmipur",
  jaipurhat: "joypurhat",
  munshigonj: "munshiganj",
  narsinghdi: "narsingdi",
  sirajgonj: "sirajganj",
  gopalgonj: "gopalganj",
  habigonj: "habiganj",
  sunamgonj: "sunamganj",
};

const toKey = (name = "") => {
  const key = String(name)
    .toLowerCase()
    .replace(/\b(district|zila|zilla)\b/g, "")
    .replace(/[^a-z]/g, "");

  return KEY_ALIASES[key] || key;
};

/* ------------------------------------------------------------------
   Sample data for ALL 64 districts: [name, division, registered workers]
   (illustrative numbers only, replace with your API data)
------------------------------------------------------------------ */

const DISTRICT_ROWS = [
  ["Barguna", "Barishal", 42000],
  ["Barishal", "Barishal", 96000],
  ["Bhola", "Barishal", 61000],
  ["Jhalokati", "Barishal", 27000],
  ["Patuakhali", "Barishal", 58000],
  ["Pirojpur", "Barishal", 39000],

  ["Bandarban", "Chattogram", 12000],
  ["Brahmanbaria", "Chattogram", 420000],
  ["Chandpur", "Chattogram", 380000],
  ["Chattogram", "Chattogram", 825430],
  ["Cumilla", "Chattogram", 640000],
  ["Cox's Bazar", "Chattogram", 120000],
  ["Feni", "Chattogram", 210000],
  ["Khagrachhari", "Chattogram", 18000],
  ["Lakshmipur", "Chattogram", 175000],
  ["Noakhali", "Chattogram", 330000],
  ["Rangamati", "Chattogram", 21000],

  ["Dhaka", "Dhaka", 1845200],
  ["Faridpur", "Dhaka", 118000],
  ["Gazipur", "Dhaka", 1124560],
  ["Gopalganj", "Dhaka", 64000],
  ["Kishoreganj", "Dhaka", 190000],
  ["Madaripur", "Dhaka", 88000],
  ["Manikganj", "Dhaka", 97000],
  ["Munshiganj", "Dhaka", 260000],
  ["Narayanganj", "Dhaka", 540000],
  ["Narsingdi", "Dhaka", 310000],
  ["Rajbari", "Dhaka", 52000],
  ["Shariatpur", "Dhaka", 135000],
  ["Tangail", "Dhaka", 450000],

  ["Bagerhat", "Khulna", 46000],
  ["Chuadanga", "Khulna", 38000],
  ["Jashore", "Khulna", 140000],
  ["Jhenaidah", "Khulna", 70000],
  ["Khulna", "Khulna", 110000],
  ["Kushtia", "Khulna", 84000],
  ["Magura", "Khulna", 33000],
  ["Meherpur", "Khulna", 24000],
  ["Narail", "Khulna", 29000],
  ["Satkhira", "Khulna", 51000],

  ["Jamalpur", "Mymensingh", 90000],
  ["Mymensingh", "Mymensingh", 280000],
  ["Netrokona", "Mymensingh", 105000],
  ["Sherpur", "Mymensingh", 47000],

  ["Bogura", "Rajshahi", 125000],
  ["Joypurhat", "Rajshahi", 31000],
  ["Naogaon", "Rajshahi", 59000],
  ["Natore", "Rajshahi", 48000],
  ["Chapainawabganj", "Rajshahi", 44000],
  ["Pabna", "Rajshahi", 76000],
  ["Rajshahi", "Rajshahi", 82000],
  ["Sirajganj", "Rajshahi", 98000],

  ["Dinajpur", "Rangpur", 72000],
  ["Gaibandha", "Rangpur", 56000],
  ["Kurigram", "Rangpur", 43000],
  ["Lalmonirhat", "Rangpur", 22000],
  ["Nilphamari", "Rangpur", 34000],
  ["Panchagarh", "Rangpur", 17000],
  ["Rangpur", "Rangpur", 68000],
  ["Thakurgaon", "Rangpur", 26000],

  ["Habiganj", "Sylhet", 155000],
  ["Moulvibazar", "Sylhet", 140000],
  ["Sunamganj", "Sylhet", 95000],
  ["Sylhet", "Sylhet", 430000],
];

// Exact figures for the districts that have a detailed record.
const DETAIL_OVERRIDES = {
  gazipur: {
    upazila: "Kaliakair",
    registered: 1124560,
    active: 456230,
    remittance: 412500000,
  },
  dhaka: {
    upazila: "Savar",
    registered: 1845200,
    active: 612340,
    remittance: 620800000,
  },
  chattogram: {
    upazila: "Sitakunda",
    registered: 825430,
    active: 318250,
    remittance: 295200000,
  },
};

const districtData = Object.fromEntries(
  DISTRICT_ROWS.map(([name, division, registered]) => {
    const key = toKey(name);
    const active = Math.round(registered * 0.4);

    return [
      key,
      {
        key,
        name,
        division,
        registered,
        active,
        remittance: Math.round(active * 905),
        upazila: null,
        ...DETAIL_OVERRIDES[key],
      },
    ];
  }),
);

const divisionDistricts = DISTRICT_ROWS.reduce((acc, [name, division]) => {
  (acc[division] ||= []).push(name);
  return acc;
}, {});

const otherUpazilasByDistrict = {
  gazipur: [
    ["Kapasia", "198,240"],
    ["Sreepur", "174,110"],
    ["Gazipur Sadar", "221,405"],
    ["Kaliganj", "152,575"],
    ["Tongi", "178,230"],
  ],
};

/* ------------------------------------------------------------------
   Colors (all from index.css variables, .theme-admin must wrap this card)
------------------------------------------------------------------ */

const TIER_FILLS = [
  "color-mix(in srgb, var(--chart-blue) 35%, var(--bg-page))",
  "color-mix(in srgb, var(--chart-blue) 65%, var(--bg-page))",
  "var(--chart-blue)",
  "var(--chart-cyan)",
];

const SELECTED_FILL = "var(--chart-green)";
const OUTSIDE_FILL = "color-mix(in srgb, var(--chart-blue) 12%, var(--bg-page))";
const DISTRICT_STROKE = "var(--chart-cyan)";

const THRESHOLDS = {
  "Worker Count": [50000, 100000, 500000],
  "Active Workers": [20000, 40000, 200000],
  Remittance: [20000000, 40000000, 200000000],
};

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------ */

const getDistrictName = (geo) =>
  geo.properties?.shapeName ||
  geo.properties?.NAME_2 ||
  geo.properties?.ADM2_EN ||
  geo.properties?.DISTRICT ||
  geo.properties?.district ||
  geo.properties?.NAME ||
  geo.properties?.name ||
  "";

const getDivision = (districtName) =>
  districtData[toKey(districtName)]?.division || "Unknown";

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

const formatRemittance = (value) => {
  if (value == null) return "Data unavailable";
  if (value >= 10000000) return `৳${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `৳${(value / 100000).toFixed(1)}L`;
  return `৳${formatNumber(value)}`;
};

const formatCompact = (metric, value) => {
  if (metric === "Remittance") return formatRemittance(value);
  if (value >= 1000000) return `${value / 1000000}M`;
  return `${value / 1000}K`;
};

const formatMetric = (metric, value) => {
  if (value == null) return "Data unavailable";
  if (metric === "Remittance") return formatRemittance(value);
  if (metric === "Active Workers") return `${formatNumber(value)} active`;
  return `${formatNumber(value)} workers`;
};

const getMetricValue = (region, metric) => {
  if (!region) return null;
  if (metric === "Active Workers") return region.active;
  if (metric === "Remittance") return region.remittance;
  return region.registered;
};

const getTier = (value, thresholds) => {
  if (value == null) return 0;
  if (value >= thresholds[2]) return 3;
  if (value >= thresholds[1]) return 2;
  if (value >= thresholds[0]) return 1;
  return 0;
};

const getFill = ({ key, selectedKey, outside, metric }) => {
  if (outside) return OUTSIDE_FILL;
  if (key === selectedKey) return SELECTED_FILL;

  const region = districtData[key];
  if (!region) return TIER_FILLS[0];

  return TIER_FILLS[getTier(getMetricValue(region, metric), THRESHOLDS[metric])];
};

/* ------------------------------------------------------------------
   GeoJSON helpers
------------------------------------------------------------------ */

// d3-geo wants clockwise outer rings. Fixes the order without changing shapes.
const ringArea = (ring) => {
  let area = 0;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    area += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }

  return area / 2;
};

const rewindRing = (ring, clockwise) => {
  const isClockwise = ringArea(ring) < 0;
  return isClockwise === clockwise ? ring : [...ring].reverse();
};

const rewindPolygon = (rings) =>
  rings.map((ring, index) => rewindRing(ring, index === 0));

const rewindFeature = (feature) => {
  const geometry = feature?.geometry;
  if (!geometry) return feature;

  if (geometry.type === "Polygon") {
    return {
      ...feature,
      geometry: { ...geometry, coordinates: rewindPolygon(geometry.coordinates) },
    };
  }

  if (geometry.type === "MultiPolygon") {
    return {
      ...feature,
      geometry: {
        ...geometry,
        coordinates: geometry.coordinates.map(rewindPolygon),
      },
    };
  }

  return feature;
};

// Centroid of the largest polygon of a feature, used for the glowing dots.
const polygonCentroid = (ring) => {
  let area = 0;
  let cx = 0;
  let cy = 0;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const f = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    area += f;
    cx += (ring[j][0] + ring[i][0]) * f;
    cy += (ring[j][1] + ring[i][1]) * f;
  }

  area *= 0.5;
  if (!area) return ring[0];

  return [cx / (6 * area), cy / (6 * area)];
};

const getFeatureCenter = (feature) => {
  const geometry = feature?.geometry;
  if (!geometry) return null;

  const polygons =
    geometry.type === "Polygon"
      ? [geometry.coordinates]
      : geometry.type === "MultiPolygon"
        ? geometry.coordinates
        : [];

  let best = null;
  let bestArea = 0;

  polygons.forEach((polygon) => {
    const outer = polygon[0];
    const area = Math.abs(ringArea(outer));

    if (area > bestArea) {
      bestArea = area;
      best = outer;
    }
  });

  return best ? polygonCentroid(best) : null;
};

// Loads the file ourselves so a missing or wrong file shows a clear message.
const useGeoJson = (url) => {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: "",
    warning: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`The server returned ${response.status} for ${url}.`);
        }

        const text = await response.text();

        let json;
        try {
          json = JSON.parse(text);
        } catch {
          throw new Error(
            `${url} is not valid JSON. The file is probably missing from the public/maps folder.`,
          );
        }

        if (!Array.isArray(json?.features) || json.features.length === 0) {
          throw new Error(`${url} does not contain any map features.`);
        }

        const warning =
          json.features.length < 30
            ? `This file has only ${json.features.length} shape(s). Districts need about 64, so it looks like a country or division outline. Use a district-level (ADM2) Bangladesh GeoJSON.`
            : "";

        setState({
          status: "ready",
          data: { ...json, features: json.features.map(rewindFeature) },
          error: "",
          warning,
        });
      } catch (error) {
        if (error.name === "AbortError") return;

        setState({
          status: "error",
          data: null,
          error: error.message,
          warning: "",
        });
      }
    };

    load();

    return () => controller.abort();
  }, [url]);

  return state;
};

/* ------------------------------------------------------------------
   Map
------------------------------------------------------------------ */

const BangladeshMap = ({
  selected,
  onSelect,
  division,
  metric,
  position,
  setPosition,
}) => {
  const { status, data, error, warning } = useGeoJson(geoUrl);
  const wrapRef = useRef(null);
  const [tip, setTip] = useState(null);

  const thresholds = THRESHOLDS[metric];
  const zoomScale = 1 / position.zoom;

  // One glowing dot per district, placed at the district centroid.
  const points = useMemo(() => {
    if (!data) return [];

    return data.features
      .map((feature) => {
        const name = getDistrictName(feature);
        const coordinates = getFeatureCenter(feature);

        return name && coordinates
          ? { key: toKey(name), name, coordinates }
          : null;
      })
      .filter(Boolean);
  }, [data]);

  // Console help for name mismatches between the file and the data table.
  useEffect(() => {
    if (!data) return;

    const names = data.features.map(getDistrictName);

    if (names.every((name) => !name)) {
      console.warn(
        "No district names found. Available properties:",
        Object.keys(data.features[0]?.properties || {}),
      );
      return;
    }

    const unmatched = names.filter(
      (name) => name && getDivision(name) === "Unknown",
    );

    if (unmatched.length > 0) {
      console.warn("GeoJSON districts missing from DISTRICT_ROWS:", unmatched);
    }
  }, [data]);

  const changeZoom = (amount) =>
    setPosition((previous) => ({
      ...previous,
      zoom: Math.min(
        4,
        Math.max(0.8, Number((previous.zoom + amount).toFixed(1))),
      ),
    }));

  const showTip = (event, name, outside) => {
    if (outside || !wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();

    setTip({
      name: districtData[toKey(name)]?.name || name,
      value: formatMetric(
        metric,
        getMetricValue(districtData[toKey(name)], metric),
      ),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const legendItems = [
    `< ${formatCompact(metric, thresholds[0])}`,
    `${formatCompact(metric, thresholds[0])} - ${formatCompact(metric, thresholds[1])}`,
    `${formatCompact(metric, thresholds[1])} - ${formatCompact(metric, thresholds[2])}`,
    `> ${formatCompact(metric, thresholds[2])}`,
  ];

  return (
    <div ref={wrapRef} className="relative w-full">
      <ComposableMap
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        projection="geoMercator"
        projectionConfig={{ center: MAP_CENTER, scale: 3500 }}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          background: "transparent",
        }}
      >
        <defs>
          <filter id="bd-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={0.8}
          maxZoom={4}
          onMoveEnd={({ coordinates, zoom }) => setPosition({ coordinates, zoom })}
        >
          {data && (
            <Geographies geography={data}>
              {({ geographies }) => {
                const isSelected = (geo) =>
                  toKey(getDistrictName(geo)) === selected.key;

                // Selected district is drawn last so its glow and border sit on top.
                const ordered = [...geographies].sort(
                  (a, b) => Number(isSelected(a)) - Number(isSelected(b)),
                );

                return ordered.map((geo) => {
                  const districtName = getDistrictName(geo);
                  const key = toKey(districtName);

                  const outside =
                    division !== "All Divisions" &&
                    getDivision(districtName) !== division;

                  const active = key === selected.key;

                  const fill = getFill({
                    key,
                    selectedKey: selected.key,
                    outside,
                    metric,
                  });

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (!outside && districtName) onSelect(districtName);
                      }}
                      onMouseEnter={(event) => showTip(event, districtName, outside)}
                      onMouseMove={(event) => showTip(event, districtName, outside)}
                      onMouseLeave={() => setTip(null)}
                      style={{
                        default: {
                          fill,
                          stroke: active ? "#ffffff" : DISTRICT_STROKE,
                          strokeOpacity: active ? 1 : 0.55,
                          strokeWidth: active ? 1.6 : 0.8,
                          vectorEffect: "non-scaling-stroke",
                          filter: active ? "url(#bd-glow)" : "none",
                          outline: "none",
                          opacity: outside ? 0.5 : 1,
                        },
                        hover: {
                          fill: outside ? OUTSIDE_FILL : "var(--brand-primary-hover)",
                          stroke: "#ffffff",
                          strokeOpacity: 1,
                          strokeWidth: 1.2,
                          vectorEffect: "non-scaling-stroke",
                          outline: "none",
                          cursor: outside ? "default" : "pointer",
                          opacity: outside ? 0.5 : 1,
                        },
                        pressed: {
                          fill: SELECTED_FILL,
                          outline: "none",
                        },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          )}

          {/* Glowing dot for every district */}
          {points.map((point) => {
            const region = districtData[point.key];
            const tier = getTier(getMetricValue(region, metric), thresholds);
            const isActive = point.key === selected.key;
            const outside =
              division !== "All Divisions" &&
              getDivision(point.name) !== division;

            const radius = (isActive ? 4.5 : [1.6, 2.2, 3, 4][tier]) * zoomScale;

            return (
              <Marker
                key={point.key}
                coordinates={point.coordinates}
                onClick={() => {
                  if (!outside) onSelect(point.name);
                }}
                style={{
                  default: { pointerEvents: "none" },
                }}
              >
                <g opacity={outside ? 0.2 : 1}>
                  <circle
                    r={radius * 2.4}
                    fill={isActive ? SELECTED_FILL : "var(--chart-cyan)"}
                    opacity={isActive ? 0.35 : 0.18}
                  />
                  <circle
                    r={radius}
                    fill={isActive ? SELECTED_FILL : "var(--chart-cyan)"}
                    stroke="#ffffff"
                    strokeOpacity={isActive ? 1 : 0.6}
                    strokeWidth={(isActive ? 1.2 : 0.5) * zoomScale}
                  />
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      {tip && (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-2 py-1 text-[10px] shadow-lg"
          style={{ left: tip.x + 12, top: tip.y - 12 }}
        >
          <p className="font-bold text-[var(--text-primary)]">{tip.name}</p>
          <p className="text-[var(--text-secondary)]">{tip.value}</p>
        </div>
      )}

      {/* Loading / error / wrong-file message */}
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 text-center">
          <p className="text-xs text-[var(--text-secondary)]">Loading map…</p>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 text-center">
          <div
            role="alert"
            className="max-w-[300px] rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-[10px] leading-relaxed text-amber-200"
          >
            <p className="font-semibold">Map data could not be loaded</p>
            <p className="mt-1">{error}</p>
            <p className="mt-1 text-amber-300/80">
              Place the file at public/maps/bangladesh-districts.geojson and
              restart the dev server.
            </p>
          </div>
        </div>
      )}

      {warning && (
        <div
          role="alert"
          className="absolute left-2 right-12 top-2 z-10 rounded-md border border-amber-500/30 bg-amber-500/10 p-2 text-[9px] leading-relaxed text-amber-200"
        >
          {warning}
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute right-2 top-2 z-10 flex flex-col overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--bg-soft)] shadow-lg">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => changeZoom(0.3)}
          className="p-1.5 text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
        >
          <Plus size={14} />
        </button>

        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => changeZoom(-0.3)}
          className="border-t border-[var(--border-strong)] p-1.5 text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
        >
          <Minus size={14} />
        </button>

        <button
          type="button"
          aria-label="Reset zoom"
          onClick={() => setPosition(DEFAULT_POSITION)}
          className="border-t border-[var(--border-strong)] p-1.5 text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
        >
          <Globe2 size={13} />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-x-3 gap-y-1 rounded bg-[var(--bg-page)] px-2 py-1.5 text-[8px] text-[var(--text-secondary)]">
        {legendItems.map((label, index) => (
          <span key={label} className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: TIER_FILLS[index] }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   Dashboard card
------------------------------------------------------------------ */

const GeographicDrilldown = () => {
  const [selected, setSelected] = useState({ key: "gazipur", name: "Gazipur" });
  const [division, setDivision] = useState("All Divisions");
  const [metric, setMetric] = useState("Worker Count");
  const [position, setPosition] = useState(DEFAULT_POSITION);

  const region = districtData[selected.key] || null;

  const availableDivisions = ["All Divisions", ...Object.keys(divisionDistricts)];

  const handleSelect = (name) => {
    const key = toKey(name);
    setSelected({ key, name: districtData[key]?.name || name });
  };

  const stats = [
    {
      label: "Registered Workers",
      value: region ? formatNumber(region.registered) : "Data unavailable",
      icon: Users,
      color: "text-[var(--chart-cyan)]",
    },
    {
      label: "Active Overseas",
      value: region ? formatNumber(region.active) : "Data unavailable",
      icon: Activity,
      color: "text-[var(--chart-blue)]",
    },
    {
      label: "Remittance YTD",
      value: region ? formatRemittance(region.remittance) : "Data unavailable",
      icon: Banknote,
      color: "text-[var(--chart-green)]",
    },
  ];

  const upazilas = otherUpazilasByDistrict[selected.key];

  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] px-3 py-2">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
            <MapPin size={17} className="text-[var(--brand-primary)]" />
            Bangladesh · Geographic Drilldown
          </h2>
          <p className="mt-1 text-[9px] text-[var(--chart-cyan)]">
            Division → District → Upazila → Interactive Map View
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <select
            value={division}
            onChange={(event) => {
              const nextDivision = event.target.value;
              setDivision(nextDivision);

              if (nextDivision !== "All Divisions" && region?.division !== nextDivision) {
                const first = DISTRICT_ROWS.find((row) => row[1] === nextDivision);
                if (first) handleSelect(first[0]);
              }
            }}
            className="max-w-[140px] rounded border border-[var(--border-strong)] bg-[var(--bg-soft)] px-2 py-1.5 text-[9px] text-[var(--text-primary)] outline-none focus:border-[var(--chart-cyan)]"
          >
            {availableDivisions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={metric}
            onChange={(event) => setMetric(event.target.value)}
            className="max-w-[130px] rounded border border-[var(--border-strong)] bg-[var(--bg-soft)] px-2 py-1.5 text-[9px] text-[var(--text-primary)] outline-none focus:border-[var(--chart-cyan)]"
          >
            <option>Worker Count</option>
            <option>Active Workers</option>
            <option>Remittance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-[minmax(145px,0.9fr)_minmax(180px,1.2fr)]">
        <div className="space-y-2">
          <div className="rounded-md border border-[var(--border-color)] bg-[var(--bg-soft)] p-2">
            <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase text-[var(--chart-cyan)]">
              <MapPinned size={12} />
              Selected District
            </h3>

            {[
              ["Division", region?.division || getDivision(selected.name)],
              ["District", selected.name],
              ["Upazila", region?.upazila || "Not available"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-2 py-1 text-[9px]">
                <span className="text-[var(--text-secondary)]">{label}</span>
                <span className="text-right font-medium text-[var(--text-primary)]">
                  {value}
                </span>
              </div>
            ))}

            <div className="my-2 border-t border-[var(--border-color)]" />

            {stats.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-2 py-1.5 text-[9px]"
              >
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <Icon size={12} className={color} />
                  {label}
                </span>
                <span className={`text-right font-bold ${color}`}>{value}</span>
              </div>
            ))}

            {!region && (
              <p className="mt-2 rounded border border-amber-500/20 bg-amber-500/5 p-2 text-[9px] leading-relaxed text-amber-200">
                This district is selectable, but its statistics have not been
                added to the sample dataset yet.
              </p>
            )}
          </div>

          <div className="rounded-md border border-[var(--border-color)] bg-[var(--bg-soft)] p-2">
            <h3 className="mb-1.5 text-[9px] font-bold text-[var(--text-primary)]">
              {upazilas
                ? `Other Upazilas in ${selected.name}`
                : `Upazilas in ${selected.name}`}
            </h3>

            {upazilas ? (
              upazilas.map(([name, count]) => (
                <div
                  key={name}
                  className="flex w-full items-center justify-between gap-2 rounded py-1 text-[9px]"
                >
                  <span className="truncate text-[var(--text-primary)]">• {name}</span>
                  <span className="text-[var(--text-secondary)]">{count}</span>
                </div>
              ))
            ) : (
              <p className="py-2 text-[9px] leading-relaxed text-[var(--text-muted)]">
                Upazila-level records will appear here when available.
              </p>
            )}
          </div>

          <p className="px-1 text-[9px] leading-relaxed text-[var(--text-muted)]">
            Statistics shown are illustrative sample data, not verified official
            figures.
          </p>
        </div>

        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-md bg-[var(--bg-page)]">
          <BangladeshMap
            selected={selected}
            onSelect={handleSelect}
            division={division}
            metric={metric}
            position={position}
            setPosition={setPosition}
          />
        </div>
      </div>
    </section>
  );
};

export default GeographicDrilldown;