import { Injectable } from "@angular/core";
import { Effect,ofType,Actions } from "@ngrx/effects";
import { Store,select} from "@ngrx/store";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IConfig } from '../../models/config.interface';
import { ConfigService } from './../../services/config.service';
import { EConfigActions, GetConfig, GetConfigSuccess } from '../actions/config.actions';

@Injectable()
export class ConfigEffects{
	constructor(
		private _configService:ConfigService,
		private _actions$: Actions){}
	@Effect()
	getConfig$ = this._actions$.pipe(
		ofType<GetConfig>(EConfigActions.GetConfig),
		switchMap(()=>this._configService.getConfig()),
		switchMap((config:IConfig)=>{
			return of(new GetConfigSuccess(config))
		})
		)
}
