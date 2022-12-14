import {  observable, action, makeAutoObservable} from "mobx";
import { getLocationsBySystemId, createLocation } from "../api/location";
import { Location } from '../models/location.model';

export class MarkersStore {
  @observable markers: Location[] = [];
  @observable marker: Location = { managerId:'', systemId: '', lat: 0, lng: 0,description: '', name: '', notes: '', email: '', phone:''};
  @observable indexMarker: any = null;

    constructor() {
        makeAutoObservable(this);
  }
  
  @action
  loudLocations = async (systemId: string) => {
        this.markers = await getLocationsBySystemId(systemId);
  }

  public addMarker = async (marker: Location) => {    
    this.markers.push(marker);
    await createLocation(marker);
  };

}
const markersStore = new MarkersStore();
export default markersStore;