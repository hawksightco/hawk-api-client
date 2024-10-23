# HawkAPI Unit Test

Unit tests are designed to be fast and act as an early detection mechanism for API breakages caused by unintended changes in functionality by developers.

When introducing new features into the codebase, all unit tests should pass. Failures in tests typically indicate that existing functionality has been altered.

If a feature modification leads to test failures, ensure that the changes are communicated properly within the team before updating the tests.

Modifying a unit test signifies a feature change. New features should not break existing tests unless they intentionally change core functionality.