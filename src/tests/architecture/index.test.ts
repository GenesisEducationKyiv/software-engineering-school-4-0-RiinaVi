import 'tsarch/dist/jest';
import { filesOfProject } from 'tsarch';

describe('architecture', () => {
  test('business logic layer (services) should not depend on the presentation layer (controllers)', () => {
    const rule = filesOfProject()
      .inFolder('services')
      .shouldNot()
      .dependOnFiles()
      .inFolder('controllers');

    expect(rule).toPassAsync();
  });

  test('business logic layer (services) should not depend on the presentation layer (jobs)', () => {
    const rule = filesOfProject()
      .inFolder('services')
      .shouldNot()
      .dependOnFiles()
      .inFolder('jobs');

    expect(rule).toPassAsync();
  });

  test('business logic layer (services) should not depend on the presentation layer (routes)', () => {
    const rule = filesOfProject()
      .inFolder('services')
      .shouldNot()
      .dependOnFiles()
      .inFolder('routes');

    expect(rule).toPassAsync();
  });

  test('data access layer (repositories) should not depend on the presentation layer (controllers)', () => {
    const rule = filesOfProject()
      .inFolder('repositories')
      .shouldNot()
      .dependOnFiles()
      .inFolder('controllers');

    expect(rule).toPassAsync();
  });

  test('business logic layer should be cycle free', () => {
    const rule = filesOfProject()
      .inFolder('services')
      .should()
      .beFreeOfCycles();

    expect(rule).toPassAsync();
  });

  test('data access layer should be cycle free', () => {
    const rule = filesOfProject()
      .inFolder('repositories')
      .should()
      .beFreeOfCycles();

    expect(rule).toPassAsync();
  });
});
