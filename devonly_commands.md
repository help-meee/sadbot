<!--
 Copyright 2019 helpme
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# Developer-only commands
If you are reading this, you have most likely been granted access to the developer-exclusive commands that this bot contains. Due to their debugging nature, they are not listed in any help command. This file is an index regarding them.

Prefixes will be denoted with §, as they may very from server to server. Arguments affixed like *\<this\>* are required, while arguments listed like *[this]* are optional.

Without further adieu, here is a (hopefully) up to date dictionary of debugging.

## Database Commands

### *§db-add \<entry name\>, \<entry description\>*
Adds an entry to the table named `Tags`. The name (`name`) is also the primary key, and no two entries can overlap. The description (`description`) can be looked up with `§db-read`. The two arguments are seperated by a comma and space to allow for whitespace in the entry name (`name`).

### *§db-read \<entry name\>*
Reads an entry from the table `Tags`. It displays the entry description (`description`) and how many times `§db-read` has been called for the entry (`usage_count`).

### *§db-edit \<entry name\>, \<new entry description\>*
Edits the description of an entry in the table `Tags`. The entry is called by the entry name (`name`), and the new entry description becomes the entry's new description (`description`).

### *§db-list*
Lists all entries in the table `Tags`. For each entry, the value of `name` is listed; the entries are seperated by commas. If there are no values in the table, the bot returns "No tags set."

### *§db-delete \<entry name\>*
Removes an entry from the table `Tags`. The entry is selected by entry name, which corresponds to `name`. If no tag has the `name` given, the bot will return "That tag did not exist."

> version PRE-INDEV