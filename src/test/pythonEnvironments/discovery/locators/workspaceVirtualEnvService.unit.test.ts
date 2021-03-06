// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import { expect } from 'chai';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { Uri } from 'vscode';
import { IInterpreterWatcher } from '../../../../client/interpreter/contracts';
import { ServiceContainer } from '../../../../client/ioc/container';
import { InterpreterWatcherBuilder } from '../../../../client/pythonEnvironments/discovery/locators/services/interpreterWatcherBuilder';
import { WorkspaceVirtualEnvService } from '../../../../client/pythonEnvironments/discovery/locators/services/workspaceVirtualEnvService';

suite('Interpreters - Workspace VirtualEnv Service', () => {
    test('Get list of watchers', async () => {
        const serviceContainer = mock(ServiceContainer);
        const builder = mock(InterpreterWatcherBuilder);
        const locator = new (class extends WorkspaceVirtualEnvService {
            public async getInterpreterWatchers(resource: Uri | undefined): Promise<IInterpreterWatcher[]> {
                return super.getInterpreterWatchers(resource);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })(undefined as any, instance(serviceContainer), instance(builder));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const watchers = 1 as any;
        when(builder.getWorkspaceVirtualEnvInterpreterWatcher(anything())).thenResolve(watchers);

        const items = await locator.getInterpreterWatchers(undefined);

        expect(items).to.deep.equal([watchers]);
        verify(builder.getWorkspaceVirtualEnvInterpreterWatcher(anything())).once();
    });
});
