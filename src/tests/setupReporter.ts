import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displaySuccessful: true,
      displayFailed: true,
      displayPending: true,
      displayDuration: true,
    },
    summary: {
      displayDuration: true,
    },
  })
);
