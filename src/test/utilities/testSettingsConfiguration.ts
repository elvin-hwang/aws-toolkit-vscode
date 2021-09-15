/*!
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AwsDevSetting, SettingsConfiguration } from '../../shared/settingsConfiguration'

/**
 * Test utility class with an in-memory Settings Configuration key-value storage
 */
export class TestSettingsConfiguration implements SettingsConfiguration {
    private readonly _data: { [key: string]: any } = {}
    private readonly _promptData: { [key: string]: boolean } = {}

    public readSetting<T>(settingKey: string, defaultValue?: T | undefined): T | undefined {
        return this._data[settingKey] as T
    }

    public async writeSetting<T>(settingKey: string, value: T, target?: any): Promise<boolean> {
        this._data[settingKey] = value
        return true
    }

    public readDevSetting<T>(key: AwsDevSetting, type: string = 'string', silent: boolean = false): T | undefined {
        return undefined
    }

    public async disablePrompt(promptName: string): Promise<void> {
        this._promptData[promptName] = true
    }

    public async shouldDisplayPrompt(promptName: string): Promise<boolean> {
        return this._promptData[promptName] !== true
    }

    public async getSuppressPromptSetting(promptName: string): Promise<{ [prompt: string]: boolean } | undefined> {
        return this._promptData
    }
}
