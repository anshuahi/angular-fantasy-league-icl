import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamName',
  standalone: true
})
export class TeamPipe implements PipeTransform {

  transform(teamId: string): string {
    switch (teamId) {
      case "NB":
        return "NewBies";
      case "LE":
        return "Legends";
      case "IJ":
        return "Juggernauts";
      case "DW":
        return "Warriors";
      case "HU":
        return "Hustlers";
      case "PR":
        return "Predators";

      default:
        return teamId;
    }
  }

}
