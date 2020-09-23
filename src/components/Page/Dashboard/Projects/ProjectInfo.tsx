import React from 'react';
import { ProjectType } from '../../../../types/ProjectType';
import moment from 'moment';
import _ from "lodash";

export default ({ project }: { project?: ProjectType }) => {

    return (
        <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="space-y-2">
                                <div className="text-lg leading-5 font-medium text-gray-900 mb-3">{project?.title}</div>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{project?.author}</div>
                                </span>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                    <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{typeof project?.deadline !== "undefined" ? moment.unix(project?.deadline).format("DD-MM-YYYY") : "DD-MM-YYYY"}</div>
                                </span>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                                    <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{_.upperFirst(project?.status)}</div>
                                </span>
                                <hr className="text-cool-gray-400" />
                                <p className="pr-2 text-sm text-gray-500 font-medium">
                                    {project?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}