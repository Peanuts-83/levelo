
export interface Stations {
  data: {
    stations: Station[]
  }
}

export interface Station {
  address: string
  capacity: number
  lat: number
  lon: number
  name: string
  station_id: string
}

export interface StationsAvailable {
  data: {
    stations: Available[]
  }
}

export interface Available {
  "is_installed": number
  "is_renting": number
  "is_returning": number
  "last_reported": number
  "num_bikes_available": number
  "num_docks_available": number
  "station_id": string
}