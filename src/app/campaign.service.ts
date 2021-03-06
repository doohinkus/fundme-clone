import { Injectable } from '@angular/core';
import { Campaign } from './campaign.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class CampaignService {
  campaigns: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.campaigns = angularFire.database.list('campaigns');
  }

  getCampaigns() {
    return this.campaigns;
  }

  getCampaignById(campaignId: string) {
    return this.angularFire.database.object('campaigns/' + campaignId);
  }

  addCampaign(newCampaign: Campaign) {
    this.campaigns.push(newCampaign);
  }

  updateCampaign(localUpdatedCampaign){
    var campaignEntryInFirebase = this.getCampaignById(localUpdatedCampaign.$key);
    campaignEntryInFirebase.update({title: localUpdatedCampaign.title,
                                name: localUpdatedCampaign.name,
                                amount: localUpdatedCampaign.amount,
                                picture: localUpdatedCampaign.picture,
                                description: localUpdatedCampaign.description});
  }
}
