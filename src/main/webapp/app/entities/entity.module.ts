import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SiteCultuelRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { SiteCultuelCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { SiteCultuelLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { SiteCultuelDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { SiteCultuelTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { SiteCultuelCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { SiteCultuelDonsMySuffixModule } from './dons-my-suffix/dons-my-suffix.module';
import { SiteCultuelPrayerMySuffixModule } from './prayer-my-suffix/prayer-my-suffix.module';
import { SiteCultuelDegreesMySuffixModule } from './degrees-my-suffix/degrees-my-suffix.module';
import { SiteCultuelMethodsMySuffixModule } from './methods-my-suffix/methods-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SiteCultuelRegionMySuffixModule,
        SiteCultuelCountryMySuffixModule,
        SiteCultuelLocationMySuffixModule,
        SiteCultuelDepartmentMySuffixModule,
        SiteCultuelTaskMySuffixModule,
        SiteCultuelCustomerMySuffixModule,
        SiteCultuelDonsMySuffixModule,
        SiteCultuelPrayerMySuffixModule,
        SiteCultuelDegreesMySuffixModule,
        SiteCultuelMethodsMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteCultuelEntityModule {}
